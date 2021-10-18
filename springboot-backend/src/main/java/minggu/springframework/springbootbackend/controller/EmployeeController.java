package minggu.springframework.springbootbackend.controller;

import minggu.springframework.springbootbackend.exception.ResourceNotFoundException;
import minggu.springframework.springbootbackend.model.Employee;
import minggu.springframework.springbootbackend.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/api/employees")
    @CrossOrigin(origins = "http://localhost:3000/")
    public List<Employee> getEmployees(){
        List<Employee> employees = (List<Employee>) this.employeeRepository.findAll();
        return employees;
    }

    @GetMapping("/api/employees/{id}")
    @CrossOrigin(origins = "http://localhost:3000/")
    public Employee getEmployee(@PathVariable long id){
        Employee employee = this.employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return employee;
    }

    @DeleteMapping ("/api/employees/{id}")
    @CrossOrigin(origins = "http://localhost:3000/")
    public List<Employee> deleteEmployee(@PathVariable long id){
        Employee employee = this.employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        this.employeeRepository.delete(employee);
        return (List<Employee>) employeeRepository.findAll();
    }

    @PostMapping("/api/employees")
    @CrossOrigin(origins = "http://localhost:3000/")
    public Employee  createEmployees(@Valid @RequestBody Employee employee) throws Exception {
        Employee e = this.employeeRepository.save(employee);
        return e;
    }

    @PatchMapping("/api/employees/{id}")
    @CrossOrigin(origins = "http://localhost:3000/")
    public Employee updateEmployee(@Valid @RequestBody Employee employee,
                                    @PathVariable long id) throws Exception {
        Employee e = this.employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        e.setFirstName(employee.getFirstName());
        e.setLastName(employee.getLastName());
        e.setEmailId(employee.getEmailId());
        employeeRepository.save(e);
        return e;
    }
}
