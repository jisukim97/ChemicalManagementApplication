package com.team.chemical.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {
    
    //BookService의 모든 메서드
    @Around("execution(* com.team.chemical.controller.*.*(..))")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("start - " + pjp.getSignature().getDeclaringTypeName() + " / " + pjp.getSignature().getName());
        Object result = pjp.proceed();
        //logger.info("finished - " + pjp.getSignature().getDeclaringTypeName() + " / " + pjp.getSignature().getName());
        return result;
    }
}


//출처: https://jeong-pro.tistory.com/171 [기본기를 쌓는 정아마추어 코딩블로그]

