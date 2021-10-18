package minggu.springframework.springbootbackend.repository;

import minggu.springframework.springbootbackend.model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
