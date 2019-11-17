package morcheka_task.payload;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.NotBlank;

@Data
public final class CreateNoteRequest {

    private Long id;

    @NotBlank
    @NonNull
    private String firstName;

    @NotBlank
    @NonNull
    private String lastName;

    @NotBlank
    @NonNull
    private String address;

    @NotBlank
    @NonNull
    private String phone;
}
