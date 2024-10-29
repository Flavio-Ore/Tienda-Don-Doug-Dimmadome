package dimadon.business.tienda_don_doug_dimmadome.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "kardex")
public class Kardex {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kardex")
    private int idKardex;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name ="nombre_producto", nullable = false)
    private String nombreProducto;

    @Column(name = "fecha", nullable = false, updatable = false, insertable = false, columnDefinition = "DATE DEFAULT (CURDATE())")
    private String fecha;
    
    @Column(name = "tipo_operacion", nullable = false)
    private String tipoOperacion;

    @Column(name ="empresa")
    private String empresa;

    @Column(name = "cantidad_entrada")
    private int cantidadEntrada;

    @Column(name = "costo_unitario_entrada")
    private double costoUnitarioEntrada;

    @Column(name ="costo_total_entrada")
    private double costoTotalEntrada;

    @Column(name = "cantidad_salida")
    private int cantidadSalida;

    @Column(name = "costo_unitario_salida")
    private double costoUnitarioSalida;

    @Column(name = "costo_total_salida")
    private double costoTotalSalida;

    @Column(name = "cantidad_saldo")
    private int cantidadSaldo;

    @Column(name = "costo_unitario_saldo")
    private double costoUnitarioSaldo;

    @Column(name = "costo_total_saldo")
    private double costoTotalSaldo;

    public int getIdKardex() {
        return idKardex;
    }

    public void setIdKardex(int idKardex) {
        this.idKardex = idKardex;
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
    
    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(String tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public int getCantidadEntrada() {
        return cantidadEntrada;
    }

    public void setCantidadEntrada(int cantidadEntrada) {
        this.cantidadEntrada = cantidadEntrada;
    }

    public double getCostoUnitarioEntrada() {
        return costoUnitarioEntrada;
    }

    public void setCostoUnitarioEntrada(double costoUnitarioEntrada) {
        this.costoUnitarioEntrada = costoUnitarioEntrada;
    }

    public double getCostoTotalEntrada() {
        return costoTotalEntrada;
    }

    public void setCostoTotalEntrada(double costoTotalEntrada) {
        this.costoTotalEntrada = costoTotalEntrada;
    }

    public int getCantidadSalida() {
        return cantidadSalida;
    }

    public void setCantidadSalida(int cantidadSalida) {
        this.cantidadSalida = cantidadSalida;
    }

    public double getCostoUnitarioSalida() {
        return costoUnitarioSalida;
    }

    public void setCostoUnitarioSalida(double costoUnitarioSalida) {
        this.costoUnitarioSalida = costoUnitarioSalida;
    }

    public double getCostoTotalSalida() {
        return costoTotalSalida;
    }

    public void setCostoTotalSalida(double costoTotalSalida) {
        this.costoTotalSalida = costoTotalSalida;
    }

    public int getCantidadSaldo() {
        return cantidadSaldo;
    }

    public void setCantidadSaldo(int cantidadSaldo) {
        this.cantidadSaldo = cantidadSaldo;
    }

    public double getCostoUnitarioSaldo() {
        return costoUnitarioSaldo;
    }

    public void setCostoUnitarioSaldo(double costoUnitarioSaldo) {
        this.costoUnitarioSaldo = costoUnitarioSaldo;
    }

    public double getCostoTotalSaldo() {
        return costoTotalSaldo;
    }

    public void setCostoTotalSaldo(double costoTotalSaldo) {
        this.costoTotalSaldo = costoTotalSaldo;
    }

    

}