package com.quickshift.controller;

import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quickshift.Session.AdminSession;
import com.quickshift.entity.AdminRequest;
import com.quickshift.entity.Calendar;
import com.quickshift.entity.Member;
import com.quickshift.entity.MemberRequest;
import com.quickshift.entity.Shift;
import com.quickshift.entity.Store;
import com.quickshift.entity.Timeplan;
import com.quickshift.form.AddStoreForm;
import com.quickshift.form.AdminLoginForm;
import com.quickshift.form.CreateAccountForm;
import com.quickshift.security.CustomSecurityContextRepository;
import com.quickshift.service.AdminService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminSession aSession;
	private final AdminService aService;
	private final AuthenticationManager authenticationManager; 
	
	@GetMapping("/")
	public String showIndex(
			@ModelAttribute
			AdminLoginForm form
			) {
		return "index";
	}

	@PostMapping("/completeLogin")
	public String completeLogin(
	        @Valid @ModelAttribute AdminLoginForm form,
	        BindingResult br,
	        HttpServletRequest request,  // HttpServletRequestを引数に追加
	        HttpServletResponse response,
	        Model model // HttpServletResponseを引数に追加
	) {
	    if (br.hasErrors()) {
	        return "index";  // バリデーションエラーの場合はログイン画面を再表示
	    }

	    // Spring Security の認証機能を使って認証を実行
	    try {
	        UsernamePasswordAuthenticationToken authenticationToken = 
	            new UsernamePasswordAuthenticationToken(form.getMail(), form.getPass());

	        // 認証を実行
	        Authentication authentication = authenticationManager.authenticate(authenticationToken);
	        System.out.println(authentication);

	        // 認証情報を SecurityContext に保存
	        SecurityContextHolder.getContext().setAuthentication(authentication);

	        // カスタム SecurityContextRepository を使ってセキュリティコンテキストをセッションに保存
	        SecurityContext securityContext = SecurityContextHolder.getContext();
	        CustomSecurityContextRepository securityContextRepository = new CustomSecurityContextRepository();
	        securityContextRepository.saveContext(securityContext, request, response);  // カスタムリポジトリに保存

	        // 認証が成功した場合
	        if (authentication.isAuthenticated()) {
	            System.out.println("Authenticated user: " + authentication.getName());
	        } else {
	            System.out.println("No authenticated user.");
	        }
	        
	        aSession.setAdmin(aService.findByAdminMail(form.getMail()));

	        return "redirect:/selectStore";  // ログイン後のリダイレクト先
	        
	    } catch (AuthenticationException e) {
	        br.rejectValue("mail", null, "メールアドレスもしくはパスワードが間違っています");
	        return "index";  // 認証失敗の場合は再度ログイン画面を表示
	    }
	}
//	@PostMapping("/completeLogin")//上の元のコード
//	public String completeLogin(
//			@Valid @ModelAttribute
//			AdminLoginForm form,
//			BindingResult br
//			) {
//		
//		if(!service.isCanLogin(form.getMail(), form.getPass())) {
//			br.rejectValue("mail", null, "メールアドレスもしくはパスワード違います");
//			return "index";
//		}
//		if(br.hasErrors()) {
//			return "index";
//		}
//		
//		session.setAdmin(service.findByAdminMail(form.getMail()));
//		return "redirect:/selectStore";
//	}
	
	@GetMapping("/selectStore")
	public String showSelectStore(
			Model model
			) {
		
		List<Store> stores = aService.findStoreByAdmin(aSession.getAdmin());
		model.addAttribute("stores", stores);
		aSession.setStore(null);
		
		return "selectStore";
	}
	
	@RequestMapping("/adminHome")
	public String showAdminHome(
			@RequestParam(value = "id", required = false) String id
			) {
		
		if(id != null) {
			Store store = aService.findByStoreId(Long.parseLong(id));
			aSession.setStore(store);
		}
		
		return "adminHome";
	}
	/*------------------------------------------------------------
	  シフト作成
	 ------------------------------------------------------------*/
	@PostMapping("/managementMember")
	public String showManagementMember(
			Model model
			) {
		
		List<Member> members = aService.findMemberByStore(aSession.getStore());
		System.err.println(members.size());
		model.addAttribute("members", members);
		
		return "managementMember"; 
	}
	
	@PostMapping("/completeManagementMember")
	public String completeManagementMember(
			@RequestParam("name") String[] names
			) {
		
		List<Member> members = aService.findMemberByStore(aSession.getStore());
		
		for(Member member : members) {
			
			aService.updateMemberName(member.getId(), null);
		}
		
		for(int i = 0; i < names.length; i++) {
			
			Member member = members.get(i);
			aService.updateMemberName(member.getId(), names[i]);
		}
		
		return "redirect:/timeplan";
	}
	
	@GetMapping("/timeplan")
	public String showMTimePlan(
			Model model
			) {
		
		List<Timeplan> timeplans = aService.findTimeplanByStore(aSession.getStore());
		model.addAttribute("timeplans", timeplans);
		
		return "timeplan";
	}
	
	@PostMapping("/yearAndMonth")
	public String showYearAndMonth(
			@RequestParam("values") String[] values
			) {
		
		List<Timeplan> plans = aService.findTimeplanByStore(aSession.getStore());
		
		for(Timeplan plan : plans) {
			
			aService.updateTimeplan(plan.getId(), null, null, null);
		}
		
		for(int i = 0; i < values.length; i++) {
			
			String name = "";
			String fromTime = "";
			String toTime = "";
			
			String[] str =  values[i].split(":");
			
			if(str.length == 3) {
				name = str[0];
				fromTime = str[1];
				toTime = str[2];
				
				Timeplan plan = plans.get(i);
				
				aService.updateTimeplan(plan.getId(), name, fromTime, toTime);
			}
		}
		
		return "yearAndMonth";
	}
	
	@PostMapping("/completeYearAndMonth")
	public String completeYearAndMonth(
			@RequestParam("year") String year,
			@RequestParam("month") String month,
			Model model
			) {
		
		List<String> yearmonths = aService.findClosingMonth(aSession.getStore());
		for(String yearmonth : yearmonths) {
			if(yearmonth.equals(year + ":" +  month)) {
				model.addAttribute("month", "すでにカレンダーが作成されています");
				return "yearAndMonth";
			}
		}
		
		aSession.setYear(Integer.parseInt(year));
		aSession.setMonth(Integer.parseInt(month));
		
		return "redirect:/adminRequest";
	}
	
	@GetMapping("/adminRequest")
	public String showAdminRequest(
			Model model
			) {
		
		List<Timeplan> timeplans = aService.findTimeplanByStore(aSession.getStore());
		model.addAttribute("timeplans", timeplans);
		model.addAttribute("year", aSession.getYear());
		model.addAttribute("month", aSession.getMonth());
		
		return "adminRequest";
	}
	
	@PostMapping("confirmAdminRequest")
	public String showConfirmAdminRequest(
			@RequestParam("requestShift") String[] shifts,
			Model model
			) {
		
		List<Timeplan> timeplans = aService.findTimeplanByStore(aSession.getStore());
		model.addAttribute("timeplans", timeplans);
		model.addAttribute("year", aSession.getYear());
		model.addAttribute("month", aSession.getMonth());
		model.addAttribute("shifts", shifts);
		
		return "confirmAdminRequest";
	}
	
	@PostMapping("/completeAdminRequest")
	public String completeAdminRequest(
			@RequestParam("requestShift")String[] shifts
			) {
		
		for(int i = 0; i < shifts.length; i++) {
			
			String shift = shifts[i];
			String[] str = shift.split(":");
			Long plan = Long.parseLong(str[0]);
			int date = Integer.parseInt(str[1]);
			int num = Integer.parseInt(str[2]);
			
			AdminRequest request = new AdminRequest();
			request.setTimeplan(aService.findByTimeplanId(plan));
			request.setNum(num);
			request.setStore(aSession.getStore());
			String month = aSession.getMonth() + "";
			if(month.length() == 1) {
				month = "0" + month;
			}
			String day = date + "";
			if(day.length() == 1) {
				day = "0" + day;
			}
			String st = aSession.getYear() + month + day;
			Long lo = Long.parseLong(st);
			request.setCalendar(aService.findCalendarById(lo));
			
			aService.saveAdminRequest(request);
			
		}
		
		return "redirect:/resultAdminRequest";
	}
	
	@GetMapping("/resultAdminRequest")
	public String showResultAdminRequest(
		Model model
		) {
		String url = aSession.getStore().getUrl();
		model.addAttribute("url", url);
		
		return "resultAdminRequest";
	}
	
	/*------------------------------------------------------------
	  アカウント作成
	 ------------------------------------------------------------*/
	@GetMapping("/createAccount")
	public String showCreateAccount(
			@ModelAttribute
			CreateAccountForm form
			) {
		return "createAccount";
	}
	@PostMapping("/confirmCreateAccount")
	public String showConfirmCreateAccount(
			@Valid @ModelAttribute
			CreateAccountForm form,
			BindingResult br
			) {
		
		if(!aService.matchPass(form.getPass1(), form.getPass2())) {
			br.rejectValue("pass1", null, "パスワードが一致しません");
		}
		if(aService.existMail(form.getMail())) {
			br.rejectValue("mail", null, "メールアドレスが既に存在しています");
		}
		if(br.hasErrors()) {
			return "createAccount";
		}
		return "confirmCreateAccount";
	}
	@PostMapping("/completeCreateAccount")
	public String completeCreateAccount(
			@Valid @ModelAttribute
			CreateAccountForm form,
			BindingResult br
			) {
		
		if(!aService.matchPass(form.getPass1(), form.getPass2())) {
			br.rejectValue("pass1", null, "パスワードが一致しません");
		}
		if(aService.existMail(form.getMail())) {
			br.rejectValue("mail", null, "メールアドレスが既に存在しています");
		}
		if(br.hasErrors()) {
			return "createAccount";
		}
		
		form.setPass1(aService.encoder(form.getPass1()));//passハッシュ化していれる
		form.setPass2(aService.encoder(form.getPass2()));
		
		aService.saveAdmin(form);
		
		return "redirect:/resultCreateAccount";
	}
	@GetMapping("/resultCreateAccount")
	public String showResultCreateAccount() {
		return "resultCreateAccount";
	}
	
	/*------------------------------------------------------------
	  店舗新規登録
	 ------------------------------------------------------------*/
	@GetMapping("/addStore")
	public String showAddStore(
			@ModelAttribute
			AddStoreForm form
			) {
		return "addStore";
	}
	
	@PostMapping("/confirmAddStore")
	public String showConfirmAddStore(
			@Valid @ModelAttribute
			AddStoreForm form,
			BindingResult br
			) {
		if(!aService.matchPass(form.getPass1(), form.getPass2())) {
			br.rejectValue("pass1", null, "パスワードが一致しません");
		}
		if(br.hasErrors()) {
			return "addStore";
		}
		return "confirmAddStore";
	}
	
	@PostMapping("/completeAddStore")
	public String completeAddStore(
			@Valid @ModelAttribute
			AddStoreForm form,
			@RequestParam("url") String requestUrl,
			BindingResult br
			) {
		if(!aService.matchPass(form.getPass1(), form.getPass2())) {
			br.rejectValue("pass1", null, "パスワードが一致しません");
		}
		if(br.hasErrors()) {
			return "addStore";
		}
		
		aService.saveStore(form, aSession.getAdmin());
		List<Store> stores = aService.findStoreByAdmin(aSession.getAdmin());
		long max = 0;
		for(Store store : stores) {
			long id = store.getId();
			if(id > max) {
				max = id;
			}
		}
		
		Store store = aService.findByStoreId(max);
		Long id = store.getId();
		
		String url = requestUrl + "/memberLogin?store_id=" + id;
		aService.updateStoreUrl(id, url);
		
		for(int i = 0; i < 15; i++) {
			Timeplan plan = new Timeplan();
			plan.setStore(store);
			aService.saveTimeplan(plan);
		}
		for(int i = 0; i < 30; i++) {
			Member member = new Member();
			member.setStore(store);
			aService.saveMember(member);
		}
		
		return "redirect:/resultAddStore";
	}
	
	@GetMapping("/resultAddStore")
	public String showResultAddStore() {
		return "resultAddStore";
	}
	
	/*------------------------------------------------------------
	シフト締め切り
	------------------------------------------------------------*/
	@PostMapping("/closingHome")
	public String showClosingHome(
			Model model
			) {
		
		model.addAttribute("months", aService.findClosingMonth(aSession.getStore()));
		
		return "closingHome";
	}
	
	@PostMapping("/checkMemberRequest")
	public String showCheckMemberRequest(
			Model model,
			@RequestParam("month") String months
			){
		
		String str[] = months.split(":");
		String year = str[0];
		String month = str[1];
		
		List<MemberRequest> requestList = aService.findMemberRequestByStore(aSession.getStore());
		List<Member> members = aService.findMemberByStore(aSession.getStore());
		List<String> completeM = new ArrayList<String>();
		List<String> yetM = new ArrayList<String>();
		for(MemberRequest req : requestList) {
			
			String reqYear = req.getCalendar().getCyear() + "";
			String reqMonth = req.getCalendar().getCmonth() + "";
			String name = req.getMember().getName();
			
			if(reqYear.equals(year) && reqMonth.equals(month)) {
				
				if(!completeM.contains(name)) {
					
					completeM.add(name);	
				}
			}
		}
		for(Member mem : members) {
			
			String name = mem.getName();
			
			if(!completeM.contains(name)) {
				
				yetM.add(name);
			}
		}
		model.addAttribute("noneMembers", yetM);
		model.addAttribute("members", completeM);
		model.addAttribute("year", months);
		
		return "checkMemberRequest";
	}
	
	@PostMapping("/closingShift")
	public String showClosingShift(
			Model model,
			@RequestParam("year") String month
			) {
		
		List<Timeplan> plans = aService.findTimeplanByStore(aSession.getStore());
		List<Member> members = aService.findMemberByStore(aSession.getStore());
		List<AdminRequest> adminRequests = aService.findAdminRequestByStore(aSession.getStore());
		List<String> requests = new ArrayList<String>();
		for(AdminRequest ar : adminRequests) {
			
			String temp = ar.getCalendar().getCdate() + ":" + ar.getTimeplan().getId() + ":" + ar.getNum();
			requests.add(temp);
		}
		List<Shift> shiftList = aService.autoShift(adminRequests);
		List<String> shifts = new ArrayList<String>();
		
		for(Shift shift : shiftList) {
			
			String date = Integer.toString(shift.getCalendar().getCdate());
			String plan = Long.toString(shift.getTimeplan().getId());
			String member = shift.getMember().getName();
			shifts.add(plan + ":" + date + ":" + member);
		}
		
		model.addAttribute("plans", plans);
		model.addAttribute("members", members);
		model.addAttribute("requests", requests);
		model.addAttribute("month", month);
		model.addAttribute("shifts", shifts);
		
		return "closingShift";
	}
	
	@PostMapping("/completeClosingShift")
	public String completeClosinfShift(
			@RequestParam("shift") String[] shifts,
			@RequestParam("year") String year,
			@RequestParam("month") String month
			) {
		
		for(String shift : shifts) {
			
			String[] strs = shift.split(":");
			Long planId = Long.parseLong(strs[0]);
			String date = strs[1];
			String name = strs[2];
			
			if(month.length() == 1) {
				month = "0" + month;
			}
			if(date.length() == 1) {
				date = "0" + date;
			}
			String calendarId = year + month + date;
			
			Shift s = new Shift();
			s.setStore(aSession.getStore());
			s.setTimeplan(aService.findByTimeplanId(planId));
			s.setMember(aService.findMemberByStoreAndName(aSession.getStore(), name));
			s.setCalendar(aService.findCalendarById(Long.parseLong(calendarId)));
			
			aService.saveShift(s);
		}
		List<AdminRequest> adminReqs = aService.findAdminRequestByStore(aSession.getStore());
		if(adminReqs.size() > 0) {
			for(AdminRequest req : adminReqs) {
				
				String reqYear = req.getCalendar().getCyear() + "";
				String reqMonth = req.getCalendar().getCmonth() + "";
				
				if(year.equals(reqYear) && month.equals(reqMonth)) {
					
					aService.deleteAdminRequest(req);
				}
			}
		}
		List<MemberRequest> memberReqs = aService.findMemberRequestByStore(aSession.getStore());
		if(memberReqs.size() > 0) {
			for(MemberRequest req : memberReqs) {
				
				String reqYear = req.getCalendar().getCyear() + "";
				String reqMonth = req.getCalendar().getCmonth() + "";
				
				if(year.equals(reqYear) && month.equals(reqMonth)) {
					
					aService.deleteMemberRequest(req);
				}
			}
		}
		
		return "redirect:/resultClosingShift";
	}
	
	@GetMapping("/resultClosingShift")
	public String showResultClosingShift(
		Model model
	) {
		String url = aSession.getStore().getUrl();
		model.addAttribute("url", url);
		
		return "resultClosingShift";
	}
	
	/*------------------------------------------------------------
	  シフト編集
	 ------------------------------------------------------------*/
	@PostMapping("/adminEditHome")
	public String showAdminEditHome() {
		
		return "adminEditHome";
	}
	
	@PostMapping("/editAdminRequestHome")
	public String showEditAdminRequestHome(
			Model model
			) {
		
		model.addAttribute("months", aService.findClosingMonth(aSession.getStore()));
		
		return "editAdminRequestHome";
	}
	
	@PostMapping("/editAdminRequest")
	public String showEditAdminRequest(
			@RequestParam("year") String year,
			@RequestParam("month") String month,
			Model model
			) {
		
		List<Timeplan> timeplans = aService.findTimeplanByStore(aSession.getStore());
		List<AdminRequest> requestList = aService.findAdminRequestByStore(aSession.getStore());
		List<String> requests = new ArrayList<String>();
		for(AdminRequest request : requestList) {
			
			String reqYear = request.getCalendar().getCyear() + "";
			String reqMonth = request.getCalendar().getCmonth() + "";
			
			if(reqYear.equals(year) && reqMonth.equals(month)) {
				
				String date = request.getCalendar().getCdate() + "";
				String planId = request.getTimeplan().getId() + "";
				String num = request.getNum() + "";
				
				String str = date + ":" + planId + ":" + num;
				requests.add(str);
			}
		}
		
		model.addAttribute("timeplans", timeplans);
		model.addAttribute("requests", requests);
		model.addAttribute("year", year);
		model.addAttribute("month", month);
		
		aSession.setYear(Integer.parseInt(year));
		aSession.setMonth(Integer.parseInt(month));
		
		return "editAdminRequest";
	}
	
	@PostMapping("/completeEditAdminRequest")
	public String completeEditAdminRequest(
			@RequestParam(name = "requestShift", required = false) String[] requests,
			@RequestParam(name = "newRequest", required = false) String[] newRequests,
			@RequestParam(name = "delRequest", required = false) String[] delRequests,
			@RequestParam("year") String year,
			@RequestParam("month") String month
			) {
		if(month.length() == 1) {
			month = "0" + month;
		}
		if(requests != null) {
			for(String request : requests) {
				
				String[] req = request.split(":");
				
				String date = req[0];
				if(date.length() == 1) {
					date = "0" + date;
				}
				String planId = req[1];
				String num = req[2].substring(0, req[2].length() - 1);
				
				String calendarId = year + month + date;
				
				aService.updateAdminRequest(num, calendarId, planId);
			}
		}
		if(newRequests != null) {
			for(String re : newRequests) {
				
				String shift = re;
				String[] req = shift.split(":");
				String date = req[0];
				if(date.length() == 1) {
					date = "0" + date;
				}
				Long planId = Long.parseLong(req[1]);
				int num = Integer.parseInt(req[2].substring(0, req[2].length() - 1));
				
				AdminRequest request = new AdminRequest();
				
				request.setTimeplan(aService.findByTimeplanId(planId));
				request.setNum(num);
				request.setStore(aSession.getStore());

				String st = year + month + date;
				Long lo = Long.parseLong(st);
				request.setCalendar(aService.findCalendarById(lo));
				
				aService.saveAdminRequest(request);
			}
		}
		if(delRequests != null) {
			for(String req : delRequests) {
				
				String[] shift = req.split(":");
				String date = shift[0];
				if(date.length() == 1) {
					date = "0" + date;
				}
				Long planId = Long.parseLong(shift[1]);
				Long calId = Long.parseLong(year + month + date);
				Calendar calendar = aService.findCalendarById(calId);
				Timeplan plan = aService.findByTimeplanId(planId);
				
				AdminRequest reqs = aService.findAdminRequestByCalendarAndTimeplan(calendar, plan);
				aService.deleteAdminRequest(reqs);
			}
		}
		
		return "redirect:/resultEdit";
	}
	
	@GetMapping("/resultEdit")
	public String resultEdit() {
		
		return "resultEdit";
	}
	
	@PostMapping("/editShiftHome")
	public String editShiftHome(
			Model model
			) {
		
		List<Shift> shifts = aService.findShiftByStore(aSession.getStore());
		List<String> months = new ArrayList<String>();
		
		for(Shift shift : shifts) {
			
			String str = shift.getCalendar().getCyear() + ":" + shift.getCalendar().getCmonth();
			
			if(!months.contains(str)) {
				months.add(str);
			}
		}
		
		model.addAttribute("months", months);
		
		return "editShiftHome";
	}
	
	@PostMapping("editShift")
	public String editShift(
			@RequestParam("year") String reqYear,
			@RequestParam("month") String reqMonth,
			Model model
			) {
		
		List<Timeplan> timeplans = aService.findTimeplanByStore(aSession.getStore());
		List<Member> members = aService.findMemberByStore(aSession.getStore());
		List<Shift> shiftList = aService.findShiftByStore(aSession.getStore());
		List<String> shifts = new ArrayList<String>();
		for(Shift shift : shiftList) {
			
			String year = shift.getCalendar().getCyear() + "";
			String month = shift.getCalendar().getCmonth() + "";
			
			if(year.equals(reqYear) && month.equals(reqMonth)) {
				
				String date = shift.getCalendar().getCdate() + "";
				String planId = shift.getTimeplan().getId() + "";
				String name = shift.getMember().getName();
				
				String str = date + ":" + planId + ":" + name;
				shifts.add(str);
			}
		}
		List<AdminRequest> requestList = aService.findAdminRequestByStore(aSession.getStore());
		List<String> requests = new ArrayList<String>();
		for(AdminRequest request : requestList) {
			
			String year = request.getCalendar().getCyear() + "";
			String month = request.getCalendar().getCmonth() + "";
			
			if(year.equals(reqYear) && month.equals(reqMonth)) {
				
				String date = request.getCalendar().getCdate() + "";
				String planId = request.getTimeplan().getId() + "";
				String num = request.getNum() + "";
				
				String str = date + ":" + planId + ":" + num;
				requests.add(str);
			}
		}
		String dates = reqYear + ":" + reqMonth;
		
		model.addAttribute("timeplans", timeplans);
		model.addAttribute("members", members);
		model.addAttribute("shifts", shifts);
		model.addAttribute("requests", requests);
		model.addAttribute("dates", dates);
		
		return "editShift";
	}
	
	@PostMapping("completeEditShift")
	public String completeEditShift() {
		
		return "redirect:/resultEdit";
	}
}
