package dimadon.business.tienda_don_doug_dimmadome.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name ="detalle_entrada")
public class DetalleEntrada {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id_detalle")
    private int idDetalle;

    @ManyToOne
    @JoinColumn(name ="id_entrada", nullable =false 
    )
    private Entrada entrada;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "costo_unitario", nullable = false)
    private double costoUnitario;

    @Column( nullable = false)
    private double subtotal;

    //getters and setters
    
    public int getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(int idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Entrada getEntrada() {
        return entrada;
    }

    public void setEntrada(Entrada entrada) {
        this.entrada = entrada;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
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

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }


    
    

}
