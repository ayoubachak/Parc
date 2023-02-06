package parc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurationSupport;


//@Configuration
//@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends WebSocketMessageBrokerConfigurationSupport {

    @Override
    protected void configureMessageBroker(MessageBrokerRegistry config){
        config.setApplicationDestinationPrefixes("/app");
        config.enableSimpleBroker("/topic");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    protected void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();

    }

}
