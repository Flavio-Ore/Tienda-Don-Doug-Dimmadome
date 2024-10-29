package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dimadon.business.tienda_don_doug_dimmadome.entities.Kardex;

public interface RepositoryKardex extends JpaRepository<Kardex, Integer> {
}
