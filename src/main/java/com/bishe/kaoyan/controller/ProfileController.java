package com.bishe.kaoyan.controller;

import com.bishe.kaoyan.pojo.dto.PaginationDTO;
import com.bishe.kaoyan.pojo.model.User;
import com.bishe.kaoyan.service.PublishService;
import com.bishe.kaoyan.utils.Result;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller("profileController")
public class ProfileController {

    @Resource(name="publishService")
    private PublishService publishService;

    @GetMapping("/profile/{action}")
    public String profile(@PathVariable(name = "action") String action,
                          Model model, HttpServletRequest request,
                          @RequestParam(name = "page",defaultValue = "1") Integer page,
                          @RequestParam(name = "size",defaultValue = "2") Integer size){

        User user = (User)request.getSession().getAttribute("loginUser");
        if (user == null)
            return "redirect:/";

        if ("questions".equals(action)) {
            model.addAttribute("section","questions");
            model.addAttribute("sectionName","我的提问");
        } else if ("replies".equals(action)) {
            model.addAttribute("section", "replies");
            model.addAttribute("sectionName", "最新回复");
        }

        Result result = publishService.listing(user.getId(),page,size);
        PaginationDTO profile = (PaginationDTO)result.getData();
        model.addAttribute("profile",profile);
        return "profile";
    }
}
