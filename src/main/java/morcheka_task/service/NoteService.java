package morcheka_task.service;

import lombok.NonNull;
import morcheka_task.model.Note;
import morcheka_task.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public void deleteById(long id) {
       noteRepository.deleteById(id);
    }

    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public void save(@NonNull final Note note) {
        noteRepository.save(note);
    }
}
