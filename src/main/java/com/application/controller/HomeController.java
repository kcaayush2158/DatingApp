package com.application.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class HomeController {
	@GetMapping("/logout-success")
	@ResponseStatus(code = HttpStatus.OK)
	public String logoutSuccess(Model model) {
		return "login";
	}

	@GetMapping("/login")
	@ResponseStatus(code = HttpStatus.OK)
	public String login(Model model) {
		return "login";
	}
	@GetMapping("/home")
	@ResponseStatus(code = HttpStatus.OK)
	public String home(Model model) {
		return "home";
	}
	
}
