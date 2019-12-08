package com.team.chemical.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="chemical")
@Getter
@Setter
@ToString
@NoArgsConstructor
//화학약품
public class Chemical {

    /**
     * 화학약품 아이디
     */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    /**
     * 화학약품 이름
     */
	@Column
    private String name;

    /**
     * 성상
     */
	@Column
    private String status;

    /**
     * 녹는점
     */
	@Column
    private float meltingPoint;

    /**
     * 끓는점
     */
	@Column
    private float boilingPoint;

    /**
     * 조해성(이게 true면 습도가 없어야 함)
     */
	@Column
    private boolean deliquescent;

    /**
     * 풍해성(이게 true면 습도가 높아야 함)
     */
	@Column
    private boolean efflorescence;

    /**
     * 광반응(이게 true면 조도가 없어야 함 )
     */
	@Column
    private boolean photoReaction;

    /**
     * 인화성(산소농도)
     */
	@Column
    private boolean flammability;

    /**
     * 발화성(산소농도)
     */
    @Column
    private boolean ignitability;

    /**
     * 폭발성
     */
    @Column
    private boolean explosive;

    /**
     * 연소성
     */
    //@Column
    //private boolean combustibility;

    /**
     * pH
     */
    @Column
    private float ph;

    /**
     * 식별체계
     */
    //@Column
    //private Integer classification;
    
    /**
     * 밀도
     */
    @Column
    private float density;
    
    @Column
    private String casNo;
    
    @Column
    private String formula;
    
    @Column
    private float molecularWeight;
    
    @Column
    private boolean alkaliMetal;
    
    @Column
    private boolean alkalineEarthMetal;
    
    @Column
    private boolean halogen;
    
    /**
     * 질병
     */
	@ManyToOne
	@JoinColumn(name="illness_id")
    private Illness illness;

    public boolean isCrash(Chemical newChemical) {
    	//이번 chemical이 newChemical과 충돌하는지?
    	boolean isCrash = false;
    	
    	if ((this.isAlkaliMetal()||this.isAlkalineEarthMetal()) && newChemical.isHalogen()) {
    		isCrash = true;
    	}
    	
    	if (this.isHalogen() && (newChemical.isAlkaliMetal()||newChemical.isAlkalineEarthMetal())) {
    		isCrash = true;
    	}
    	
    	if (this.ph>=0 && newChemical.ph>=0) {
    		double first = 7.0-this.ph;
    		double second = 7.0-newChemical.ph;
    		if (first * second < 0.0) {
    			isCrash = true;
    		}
    	}
    	
    	return isCrash;
    }
    
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
		Chemical other = (Chemical) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

    
}