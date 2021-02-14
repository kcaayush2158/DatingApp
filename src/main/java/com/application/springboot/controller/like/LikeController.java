package com.application.springboot.controller.like;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LikeController {

    @GetMapping("/likes")
    public  String likePage(Model model) {
        return "likes";

    }
}
