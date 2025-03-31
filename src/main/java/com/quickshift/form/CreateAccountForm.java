package com.quickshift.form;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class CreateAccountForm {
	
	@NotEmpty(message="管理者名を入力してください")
	@Size(max = 15, message="１５文字以下にしてください")
	private String name;
	
	@NotEmpty(message="メールアドレスを入力してください")
	@Email(message="有効なメールアドレスを入力してください")
	private String mail;
	
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
	message="パスワードは8～20文字で、大文字・小文字・数字を含めてください")
	private String pass1;
	
	private String pass2;
}