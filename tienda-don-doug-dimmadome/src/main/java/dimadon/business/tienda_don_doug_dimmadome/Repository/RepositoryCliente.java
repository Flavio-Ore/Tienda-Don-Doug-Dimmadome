package dimadon.business.tienda_don_doug_dimmadome.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;


@Repository
public interface  RepositoryCliente extends JpaRepository<Cliente, Integer> {
    
    //para llamar a los usuarios por estado activo o inactivo
    List<Cliente> findByEstado(String estado);

    Optional<Cliente> findByNumeroDocumento(String numeroDocumento);
}
