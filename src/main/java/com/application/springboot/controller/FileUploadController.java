package com.application.springboot.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.application.springboot.model.User;
import com.application.springboot.service.AmazonService;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
@Controller
public class FileUploadController {

    private final AmazonService amazonService;

    @Autowired
    FileUploadController(AmazonService amazonService) {
        this.amazonService = amazonService;
    }

    @Autowired
    private UserService userService;

    @GetMapping("/profile/pic/upload")
    public String filePage(Model model){
        return "/imageupload/FileUpload";
    }

    @GetMapping("/profile/pic/success")
    public String filePage2(Model model){
        return "/imageupload/uploadStatusView";
    }


    @PostMapping("/upload")
    public  String upload(Model model, @RequestPart("file") MultipartFile files,Principal principal) {
         this.amazonService.uploadFile(files,principal);
        return "redirect:/settings";
    }

    @PostMapping("/user/p/upload")
    public  String uploadUserPhoto(Model model, @RequestPart("file") MultipartFile files,Principal principal) {
       this.amazonService.uploadUserImages(files,principal);
       return "redirect:/profile";
    }


}
