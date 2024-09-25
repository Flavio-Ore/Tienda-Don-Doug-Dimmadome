package dimadon.business.tienda_don_doug_dimmadome.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.DetallePedidoProveedor;

@Repository
public interface DetallePedidoProveedorRepository extends JpaRepository<DetallePedidoProveedor, Integer> {
}
