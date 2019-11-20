package com.team.chemical.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="stock")
@Data
@NoArgsConstructor
//화학약품 재고
public class Stock {

    /**
     * 재고 아이디
     */
	@Column
    private Integer id;

    /**
     * 재고 별칭
     */
	@Column
    private String nickname;

    /**
     * 입고일 
     */
	@Column
    private LocalDate putDate;

    /**
     * 유효기간
     */
	@Column
    private LocalDate expireDate;

    /**
     * 전체 부피
     */
	@Column
    private Float volume;

    /**
     * 남은 부피
     */
	@Column
    private Float remainingVolume;

    /**
     * 화학약품 (특성)
     */
	@ManyToOne
	@JoinColumn(name="chemical_id")
    private Chemical chemical;

    /**
     * 저장된 보관장소
     */
    @ManyToOne
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

}