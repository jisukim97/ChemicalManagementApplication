package com.team.chemical.entity;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.Data;

@Component
@Data
public class Msds {
	
	private HttpComponentsClientHttpRequestFactory factory;
	
	private String crawlingUrl = "http://127.0.0.1:5000/search/";
	
	public Msds () {
		//출처 : https://sjh836.tistory.com/141
		factory = new HttpComponentsClientHttpRequestFactory();
		factory.setReadTimeout(5000); //ms
		factory.setConnectTimeout(5000);
		HttpClient httpClient = HttpClientBuilder.create()
				.setMaxConnTotal(100) //ip+포트 연결 제한
				.setMaxConnPerRoute(100) //최대 커넥션
				.build();
		factory.setHttpClient(httpClient);
		//RestTemplate restTemplate = new RestTemplate(factory);

	}
	
	private RestTemplate getRestTemplate() {
		return new RestTemplate(this.factory);
	}

    /**
     * @param chemicalName
     */
    public Chemical searchChemical(String chemicalName) throws Exception{
        // TODO 
    	String url = crawlingUrl + chemicalName;
		Chemical chemical = getRestTemplate().getForObject(url, Chemical.class);
		if (chemical.getDensity() == 0.0) {
			throw new Exception("cannot find chemicals from msds");
		}
		return chemical;
    }

}