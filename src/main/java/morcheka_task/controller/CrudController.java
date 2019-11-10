package morcheka_task.controller;

import morcheka_task.model.Note;
import morcheka_task.payload.NoteRequest;
import morcheka_task.payload.NoteResponse;
import morcheka_task.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class CrudController {

    private static final String USER_NOT_FOUND = "The user is not found";

    private final UserService userService;

    public CrudController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity getAllNotes() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }

        var userOptional = userService.findUserByUsername(username);

        if (userOptional.isPresent()) {
            var user = userOptional.get();
            var notes = user.getNotes();
            var notesResponse = new ArrayList<NoteResponse>();

            for (Note note: notes) {
                var noteResponse = new NoteResponse();

                noteResponse.setFirstName(note.getFirstName());
                noteResponse.setLastName(note.getLastName());
                noteResponse.setAddress(note.getAddress());
                noteResponse.setPhone(note.getPhone());
                noteResponse.setId(note.getId());

                notesResponse.add(noteResponse);
            }

            return ResponseEntity.status(HttpStatus.OK).body(notesResponse);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(USER_NOT_FOUND);
        }
    }

    @GetMapping("/delete")
    @Transactional
    public ResponseEntity deleteNote(@RequestParam("id") long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }

        var userOptional = userService.findUserByUsername(username);

        if (userOptional.isPresent()) {
            var user = userOptional.get();
            var notes = user.getNotes();

            for (Note note : notes) {
                if (note.getId() == id) {
                    notes.remove(note);
                    break;
                }
            }

            userService.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("The note is successfully deleted");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(USER_NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity saveNote(@Valid @RequestBody NoteRequest noteRequest) {
        final Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }

        var userOptional = userService.findUserByUsername(username);

        if (userOptional.isPresent()) {
            var user = userOptional.get();
            var newNote = new Note();

            newNote.setFirstName(noteRequest.getFirstName());
            newNote.setLastName(noteRequest.getLastName());
            newNote.setAddress(noteRequest.getAddress());
            newNote.setPhone(noteRequest.getPhone());

            if (noteRequest.getId() != null) {
                newNote.setId(noteRequest.getId());
            }

            var notes = user.getNotes();

            if (notes != null) {
                for (int i = 0; i < notes.size(); i++) {
                    if (notes.get(i).getId() == newNote.getId()) {
                        notes.set(i, newNote);
                        break;
                    }
                }

                notes.add(newNote);
            } else {
                var newNotes = new ArrayList<Note>();
                newNotes.add(newNote);
                user.setNotes(newNotes);
            }

            userService.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("The note is successfully saved");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(USER_NOT_FOUND);
        }
    }
}
