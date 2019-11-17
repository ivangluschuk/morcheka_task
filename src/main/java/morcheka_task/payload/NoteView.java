package morcheka_task.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public final class NoteView {

    @NotBlank
    private long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String address;

    @NotBlank
    private String phone;
}
