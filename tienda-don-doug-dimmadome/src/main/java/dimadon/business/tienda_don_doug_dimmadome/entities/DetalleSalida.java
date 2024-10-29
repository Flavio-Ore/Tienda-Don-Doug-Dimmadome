package dimadon.business.tienda_don_doug_dimmadome.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_salida")
public class DetalleSalida {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private int idDetalle;

    @ManyToOne
    @JoinColumn(name ="id_salida")
    private Salida salida;
    
    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;

    @Column(nullable = false)
    private int cantidad;

    @Column(name ="costo_unitario",nullable=false)
    private double costoUnitario;

    @Column(nullable = false)
    private double total;

    public int getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(int idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Salida getSalida() {
        return salida;
    }

    public void setSalida(Salida salida) {
        this.salida = salida;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getCostoUnitario() {
        return costoUnitario;
    }

    public void setCostoUnitario(double costoUnitario) {
        this.costoUnitario = costoUnitario;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }



}
