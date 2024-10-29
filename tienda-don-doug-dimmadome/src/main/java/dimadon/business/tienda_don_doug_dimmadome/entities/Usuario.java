package dimadon.business.tienda_don_doug_dimmadome.entities;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private int idUsuario;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String contrasena;

    @Column(name = "fecha_creacion", nullable = false, updatable = false, insertable = false, columnDefinition = "DATE DEFAULT (CURDATE())")
    private String fechaCreacion;

    @Column(nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'activo'")
    private String estado="activo";

    @ManyToOne
    @JoinColumn(name = "id_tipo_usuario", nullable = false)
    private TipoUsuario tipoUsuario;

    // Getters y Setters
    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        if (estado.equalsIgnoreCase("activo") || estado.equalsIgnoreCase("inactivo")) {
            this.estado = estado;
        } else {
            throw new IllegalArgumentException("Estado no válido. Usa 'activo' o 'inactivo'.");
        }
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
