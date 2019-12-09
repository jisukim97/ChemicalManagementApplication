package com.team.chemical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAspectJAutoProxy
@SpringBootApplication
@EnableScheduling
public class ChemicalApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChemicalApplication.class, args);
	}

}
