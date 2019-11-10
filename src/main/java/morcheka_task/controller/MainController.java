package morcheka_task.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public final class MainController {

    private static final String INDEX_PAGE = "index.html";

    @GetMapping(value = {"/", "/login"})
    public String getLoginForm() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return "redirect:/crud";
        } else {
            return INDEX_PAGE;
        }
    }

    @GetMapping("/crud")
    public String getCrudForm() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return INDEX_PAGE;
        } else {
            return "redirect:/login";
        }
    }
}