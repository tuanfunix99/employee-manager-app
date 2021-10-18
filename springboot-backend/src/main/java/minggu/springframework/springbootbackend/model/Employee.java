package minggu.springframework.springbootbackend.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "first_name")
    @NotNull(message = "First name not null")
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Column(name = "last_name")
    @NotNull(message = "Last name not null")
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Column(name = "email_id", unique = true)
    @NotNull(message = "Email not null")
    @NotBlank(message = "Email is mandatory")
    @Email
    private String emailId;
}
