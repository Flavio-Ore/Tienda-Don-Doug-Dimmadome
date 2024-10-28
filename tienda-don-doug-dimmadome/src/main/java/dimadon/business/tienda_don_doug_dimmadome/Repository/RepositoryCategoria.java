package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Categoria;

@Repository
public interface RepositoryCategoria extends JpaRepository<Categoria, Integer> {
    
}
