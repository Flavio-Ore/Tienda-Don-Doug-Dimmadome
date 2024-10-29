package dimadon.business.tienda_don_doug_dimmadome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ReniecApiConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
