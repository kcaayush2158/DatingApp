package com.application.controller;

import com.application.domain.Response;
import com.application.model.User;
import com.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/user/create")
    public  ResponseEntity<Response> registration( @RequestBody User user) {
        User saveUser = userService.save(user);
        if(saveUser != null){
            return new ResponseEntity<Response>(new Response("User is saved successfully"),HttpStatus.OK);
        }
        return null;
    }


    @GetMapping("/user")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<User>> getAllCustomers() {
        List<User> user = userService.findAll();

        return new ResponseEntity<List<User>>(user,HttpStatus.OK);
    }

    @GetMapping("/getUser")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<User> getUser(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());

        return new ResponseEntity<User>(user,HttpStatus.OK);
    }


//    @DeleteMapping("/user/delete")
//    @ResponseStatus(code = HttpStatus.OK)
//    public ResponseEntity<String> deleteCustomer(@PathVariable("id") long id) {
//        userRepository.delete(id);
//        return new ResponseEntity<>("Customer have been deleted", HttpStatus.OK);
//    }

    /*
     * @GetMapping("/user/{username}") public User findByUsername(@PathVariable
     * String username) { User user = userRepository.findByUsername(username);
     * return user;
     *
     * }
     *
     * @PutMapping("/user/{id}") public ResponseEntity<User>
     * updateUser(@PathVariable("id") long id , @RequestBody User user){ User
     * username = userRepository.saveUser(user);
     *
     * return new ResponseEntity<>(userRepository.save(username),HttpStatus.OK); }
     *
     * return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     *
     * }
     */

}
