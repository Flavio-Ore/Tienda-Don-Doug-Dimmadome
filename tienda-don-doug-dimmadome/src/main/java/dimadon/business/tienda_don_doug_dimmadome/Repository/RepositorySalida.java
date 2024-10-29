package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Salida;

@Repository
public interface RepositorySalida extends JpaRepository<Salida,Integer>{
    
    @Query(value = "SELECT MAX(s.idSalida) FROM Salida s")
    int findMaxIdSalida();
}
