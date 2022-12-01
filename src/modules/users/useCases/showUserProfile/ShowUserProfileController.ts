import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    try {
      return response
        .status(200)
        .json(this.showUserProfileUseCase.execute({ user_id }));
    } catch (err) {
      return response.status(404).json({
        error: err.message || "Unexpected error.",
      });
    }
  }
}

export { ShowUserProfileController };
