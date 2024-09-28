package com.example.prueba2.services;

import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.prueba2.models.UsuarioModel;
import com.example.prueba2.repositories.UsuarioReporitory;

@Service
public class UsuarioService {
    

    @Autowired
    UsuarioReporitory usuarioReporitory;

    public ArrayList<UsuarioModel> obtenerUsuario(){
        return (ArrayList<UsuarioModel>)usuarioReporitory.findAll();
    }

    public UsuarioModel guardarUsuario(UsuarioModel usuario){
        return usuarioReporitory.save(usuario);
    }

    
}
