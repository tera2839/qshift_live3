package com.quickshift.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class AddStoreForm {
	
	@NotBlank(message="店舗名を入力してください")
	@Size(max = 15, message="１５文字以下にしてください")
	private String name;
	
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
	message="パスワードは8～20文字で、大文字・小文字・数字を含めてください")
	private String pass1;
	
	private String pass2;
}
