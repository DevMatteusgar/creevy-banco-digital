package app.back_end.charts.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // Destino das mensagens enviadas ao front
        registry.setApplicationDestinationPrefixes("/app"); // Prefixo para mensagens do front
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")            // Endpoint de conexão STOMP
                .setAllowedOrigins("*")
                .withSockJS();                 // Habilita SockJS
    }
}
