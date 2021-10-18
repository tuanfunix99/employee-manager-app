package minggu.springframework.springbootbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiException handleResourceNotFoundException(ResourceNotFoundException exception,
                                                        HttpServletRequest request){
        ApiException apiException = new ApiException(404, exception.getMessage(),
                request.getContextPath(), new Date().getTime(), null);
        return apiException;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiException handlerMethodArgumentNotValidException(MethodArgumentNotValidException exception,
                                                               HttpServletRequest request){
        HashMap<String, String> validationErrors = new HashMap<>();
        BindingResult bindingResult = exception.getBindingResult();
        for(FieldError fieldError : bindingResult.getFieldErrors()){
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        ApiException error = new ApiException(400, exception.getMessage(),
                request.getContextPath(), new Date().getTime(), validationErrors);
        return error;
    }
}
