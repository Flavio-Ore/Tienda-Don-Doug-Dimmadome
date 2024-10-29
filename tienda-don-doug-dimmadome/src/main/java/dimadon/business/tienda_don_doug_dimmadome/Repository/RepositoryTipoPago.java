package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.TipoPago;

@Repository
public interface  RepositoryTipoPago extends JpaRepository<TipoPago, Integer>{
    


}
