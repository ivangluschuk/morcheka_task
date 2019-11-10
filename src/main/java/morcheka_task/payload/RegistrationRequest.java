package morcheka_task.payload;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.NotBlank;

@Data
public final class RegistrationRequest {

    @NotBlank
    @NonNull
    private String username;

    @NotBlank
    @NonNull
    private String password;
}
