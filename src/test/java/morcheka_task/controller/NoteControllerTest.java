package morcheka_task.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.file.Files;
import java.nio.file.Paths;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-schema.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-user.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/delete-user.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class NoteControllerTest {

    private String noteSaveJson ="src/test/resources/json/note-save.json";

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithUserDetails("z1")
    public void saveNote() throws Exception {
        var customerRequest = Files.readString(Paths.get(noteSaveJson));

        mockMvc.perform(post("/api/notes/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(customerRequest))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk());
    }

    @Test
    @WithUserDetails("z1")
    public void deleteNote() throws Exception {
        var customerRequest = Files.readString(Paths.get(noteSaveJson));

        mockMvc.perform(post("/api/notes/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(customerRequest))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/notes/delete?id=1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(customerRequest))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk());
    }

    @Test
    @WithUserDetails("z1")
    public void findAllNotes() throws Exception {
        var customerRequest = Files.readString(Paths.get(noteSaveJson));

        mockMvc.perform(post("/api/notes/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(customerRequest))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/notes/all")
                .contentType(MediaType.APPLICATION_JSON)
                .content(customerRequest))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk());
    }
}
