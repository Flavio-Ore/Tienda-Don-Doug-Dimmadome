package Models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.JOptionPane;

public class UsuariosDao {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;

    public Usuarios login(String nombre, String contraseña) {
        String sql = "SELECT * FROM usuario WHERE  nombre=? AND contrasena=?";
        Usuarios us = new Usuarios();
        try {
            con = cn.getConexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, nombre);
            ps.setString(2, contraseña);
            rs = ps.executeQuery();
            if (rs.next()) {
                us.setId(rs.getInt("id"));
                us.setNombre(rs.getString("nombre"));
                us.setContrasena(rs.getString("contrasena"));
                us.setEmail(rs.getString("email"));
                us.setFecha_creacion(rs.getString("fecha_creacion"));
                us.setId_tipo_usuario(rs.getString("Id_tipo_usuario"));
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, e.toString());
        }
        return us;
    }
}
