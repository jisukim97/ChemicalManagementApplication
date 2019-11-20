package com.team.chemical.entity;



import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="inventory")
@Data
@NoArgsConstructor
//화학 약품 보관함
public class Inventory {

    /**
     * 보관함 아이디 : 의미있는 조합의 이름으로 바꿀 것
     */
	@Column
    private String id;

    /**
     * 보관함 이름
     */
	@Column
    private String name;

    /**
     * 보관함 온도
     */
	@Column
    private Float temperature;

    /**
     * 보관함 습도 -1 / 0 / 1
     */
	@Column
    private Integer humidity;

    /**
     * 보관함 조도
     */
	@Column
    private Boolean illuminance;

    /**
     * 보관함 산소 농도 
     */
	@Column
    private Boolean oximeter;

    /**
     * 보관함 폭발 방지 
     */
	@Column
    private Boolean explosion;

    /**
     * 보관함에 저장 되어 있는 약품들(재고들)
     */
	@OneToMany(mappedBy = "stock")
    private Set<Stock> stockList;

}