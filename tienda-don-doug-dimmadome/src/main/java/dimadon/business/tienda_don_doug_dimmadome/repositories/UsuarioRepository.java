package dimadon.business.tienda_don_doug_dimmadome.repositories;



import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
   
}
