package com.team.chemical.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="stock")
@Getter
@Setter
@ToString
@NoArgsConstructor
//화학약품 재고
public class Stock {

    /**
     * 재고 아이디
     */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
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
    private float volume;

    /**
     * 남은 부피
     */
	@Column
    private float remainingVolume;

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
    @JsonBackReference("inventoryStock")
    private Inventory inventory;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Stock other = (Stock) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

    
}