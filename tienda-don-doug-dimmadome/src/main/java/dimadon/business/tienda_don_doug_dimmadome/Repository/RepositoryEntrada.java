package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dimadon.business.tienda_don_doug_dimmadome.entities.Entrada;

 
public interface RepositoryEntrada extends JpaRepository<Entrada,Integer> {
  

    @Query("SELECT COALESCE(MAX(e.id), 0) FROM Entrada e")
    int findMaxIdEntrada();

}
    

