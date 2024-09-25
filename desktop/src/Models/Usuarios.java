package Models;

public class Usuarios {

    private int id;
    private String nombre;
    private String email;
    private String contrasena;
    private String fecha_creacion;
    private String id_tipo_usuario;

    public Usuarios() {

    }

    public Usuarios(int id, String nombre, String email, String contrasena, String fecha_creacion, String id_tipo_usuario) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.fecha_creacion = fecha_creacion;
        this.id_tipo_usuario = id_tipo_usuario;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public void setContrasena(String contraseña) {
        this.contrasena = contraseña;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creación) {
        this.fecha_creacion = fecha_creación;
    }

    public String getId_tipo_usuario() {
        return id_tipo_usuario;
    }

    public void setId_tipo_usuario(String id_tipo_usuario) {
        this.id_tipo_usuario = id_tipo_usuario;
    }

}
