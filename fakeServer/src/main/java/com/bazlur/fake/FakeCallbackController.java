package com.bazlur.fake;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class FakeCallbackController {
	private static final Logger LOGGER = LoggerFactory.getLogger(FakeCallbackController.class);

	@GetMapping("callback")
	public void receiveCallback(@RequestParam(required = false, name = "status") String status, HttpServletRequest request) {
		LOGGER.info("Received callback from: {}, status: {}", request.getRemoteAddr(), status);
	}
}
