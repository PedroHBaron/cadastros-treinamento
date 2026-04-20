package com.conceito.cadastros.repositories;

import com.conceito.cadastros.entities.Cliente;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long>, JpaSpecificationExecutor<Cliente> {
    List<Cliente> findAllByAtivoTrue(Pageable pageable, Specification<Cliente> spec);
    List<Cliente> findAllByAtivoTrue();
}
