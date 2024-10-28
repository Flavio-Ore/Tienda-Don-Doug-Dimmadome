package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.DetalleSalida;
import dimadon.business.tienda_don_doug_dimmadome.entities.Entrada;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceDetalleEntrada;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceDetalleSalida;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceEntrada;


@RestController
@RequestMapping("/detalleSalida")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class DetalleSalidaController {
    
    @Autowired
    ServiceDetalleSalida serviceDetalleSalida;

    @GetMapping("/obtener")
    public ArrayList<DetalleSalida> obtenerDetalleSalidas(){
        return serviceDetalleSalida.obtenerDetalleSalidas();
    }

    @PostMapping("/insertar")
    public DetalleSalida insertarDetalleSalida(@RequestBody DetalleSalida detalleSalida){
        return serviceDetalleSalida.registrarDetalleSalidaConKardex(detalleSalida);
    }

    //obtener ultimo is de salida
    @GetMapping("/ultimoIdSalida")
    public int obtenerUltimoId(){
        return serviceDetalleSalida.obtenerUltimoIdSalida();
    }
}
