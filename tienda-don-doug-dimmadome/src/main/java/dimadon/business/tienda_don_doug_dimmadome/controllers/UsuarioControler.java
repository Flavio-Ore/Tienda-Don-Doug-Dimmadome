package com.example.prueba2.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dimadon.business.models.UsuarioModel;
import com.example.prueba2.services.UsuarioService;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/usuario")
public class UsuarioControler {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping()
    public ArrayList<UsuarioModel> obtnerUsuarios() {
        return usuarioService.obtenerUsuario();
    }

    @PostMapping()
    public UsuarioModel guardarUsuario(@RequestBody UsuarioModel usuario) {

        return this.usuarioService.guardarUsuario(usuario);
    }

}
