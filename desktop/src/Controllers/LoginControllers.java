package Controllers;

import Models.Usuarios;
import Models.UsuariosDao;
import Vistas.Index;
import Vistas.frmLogin;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Locale;
import javax.swing.JOptionPane;

public class LoginControllers implements ActionListener {
    private Usuarios us;
    private UsuariosDao usDao;
    private frmLogin views;

    public LoginControllers(Usuarios us, UsuariosDao usDao, frmLogin views) {
        this.us = us;
        this.usDao = usDao;
        this.views = views;
        this.views.btnLogin.addActionListener(this);
        this.views.btnCancelar.addActionListener(this);
        this.views.setLocationRelativeTo(null);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == views.btnLogin) {
            if (views.txtNombre.getText().equals("") || String.valueOf(views.txtContraseña.getPassword()).equals("")) {
                JOptionPane.showMessageDialog(null, "Los campos están vacíos");
            } else {
                String nombre = views.txtNombre.getText();
                String contraseña = String.valueOf(views.txtContraseña.getPassword());
                us = usDao.login(nombre, contraseña);
                
                // Verificar si el usuario fue encontrado
                if (us.getNombre() != null) {
                    // Mostrar la siguiente ventana (Index)
                    Index ind = new Index();
                    ind.setVisible(true);
                    
                    this.views.dispose();
                } else {
                    JOptionPane.showMessageDialog(null, "Nombre de usuario o contraseña incorrectos");
                    
                }
            }
        } else{
            int pregunta=JOptionPane.showConfirmDialog(null, "Esta seguro que desea salir","pregunta",JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
            if (pregunta==0){
                System.exit(0);
            }
        }
    }
}

