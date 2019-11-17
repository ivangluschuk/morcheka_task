package morcheka_task.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public final class ApplicationController {

    private static final String INDEX_PAGE = "index.html";

    @GetMapping(value = {"/", "/login"})
    public String getLoginForm() {
        return isRequestAuthenticated()
                ? "redirect:/notes"
                : INDEX_PAGE;
    }

    @GetMapping("/notes")
    public String getCrudForm() {
        return isRequestAuthenticated()
            ? INDEX_PAGE
            : "redirect:/login";
    }

    private boolean isRequestAuthenticated() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDetails;
    }
}