package minggu.springframework.springbootbackend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiException {
    private int status;
    private String message;
    private String path;
    private long timestamp;
    private HashMap<String, String> validationErrors = new HashMap<>();
}
