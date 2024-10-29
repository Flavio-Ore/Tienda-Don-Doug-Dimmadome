package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryCliente;
import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;

@Service
public class ReniecService {

    private final RestTemplate restTemplate;
    private final RepositoryCliente clienteRepository;

    @Value("${reniec.api.url}")
    private String reniecApiUrl;

    @Value("${reniec.api.token}")
    private String apiToken;

    public ReniecService(RestTemplate restTemplate, RepositoryCliente clienteRepository) {
        this.restTemplate = restTemplate;
        this.clienteRepository = clienteRepository;
    }

    public Cliente obtenerDatosPorDni(String dni, String direccion) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiToken);
            headers.set("Content-Type", "application/json");

            Map<String, String> body = new HashMap<>();
            body.put("dni", dni);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                reniecApiUrl,
                HttpMethod.POST,
                entity,
                String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonNode = mapper.readTree(response.getBody());

                if (jsonNode.get("success").asBoolean()) {
                    String nombreCompleto = jsonNode.get("data").get("nombre_completo").asText();

                    // Crear y guardar el cliente
                    Cliente cliente = new Cliente();
                    cliente.setNumeroDocumento(dni);
                    cliente.setNombreCliente(nombreCompleto);
                    cliente.setDireccion(direccion);

                    return clienteRepository.save(cliente);  // Guardar en la BD
                } else {
                    throw new RuntimeException("Error en la respuesta de RENIEC");
                }
            } else {
                throw new RuntimeException("Error en la solicitud: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar los datos de RENIEC: " + e.getMessage());
        }
    }
}
