package dimadon.business.tienda_don_doug_dimmadome.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;

@Repository
public interface RepositoryUsuario extends JpaRepository<Usuario,Integer> {
    //para hacer el login
    Optional<Usuario> findByEmail(String email);

    //para llamar a los usuarios por estado activo o inactivo
    List<Usuario> findByEstado(String estado);
}
