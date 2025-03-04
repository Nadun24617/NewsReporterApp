package com.example.helanewsreporting // Change this to your package name

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.helanewsreporting.network.RetrofitClient
import com.example.helanewsreporting.network.SignupRequest
import com.example.helanewsreporting.network.SignupResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignupActivity : AppCompatActivity() {

    private lateinit var etFirstName: EditText
    private lateinit var etLastName: EditText
    private lateinit var etEmail: EditText
    private lateinit var etNIC: EditText
    private lateinit var etPassword: EditText
    private lateinit var etConfirmPassword: EditText
    private lateinit var etContactNumber: EditText
    private lateinit var etExperience: EditText
    private lateinit var btnSignup: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        // Initialize the views
        etFirstName = findViewById(R.id.etFirstName)
        etLastName = findViewById(R.id.etLastName)
        etEmail = findViewById(R.id.etEmail)
        etNIC = findViewById(R.id.etNIC)
        etPassword = findViewById(R.id.etPassword)
        etConfirmPassword = findViewById(R.id.etConfirmPassword)
        etContactNumber = findViewById(R.id.etContactNumber)
        etExperience = findViewById(R.id.experiance)
        btnSignup = findViewById(R.id.btnSignup)

        btnSignup.setOnClickListener {
            val firstName = etFirstName.text.toString().trim()
            val lastName = etLastName.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val nic = etNIC.text.toString().trim()
            val password = etPassword.text.toString().trim()
            val confirmPassword = etConfirmPassword.text.toString().trim()
            val contactNumber = etContactNumber.text.toString().trim()
            val experience = etExperience.text.toString().trim()

            // Basic validation
            if (firstName.isEmpty() || lastName.isEmpty() || email.isEmpty() ||
                nic.isEmpty() || password.isEmpty() || confirmPassword.isEmpty() ||
                contactNumber.isEmpty() || experience.isEmpty()) {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password != confirmPassword) {
                Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val signupRequest = SignupRequest(
                firstName = firstName,
                lastName = lastName,
                email = email,
                nic = nic,
                password = password,
                contactNumber = contactNumber,
                experience = experience
            )

            val call = RetrofitClient.apiService.signup(signupRequest)
            call.enqueue(object : Callback<SignupResponse> {
                override fun onResponse(call: Call<SignupResponse>, response: Response<SignupResponse>) {
                    if (response.isSuccessful) {
                        val message = response.body()?.message ?: "Signup Successful"
                        Toast.makeText(this@SignupActivity, message, Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this@SignupActivity, "Signup Failed", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<SignupResponse>, t: Throwable) {
                    Toast.makeText(this@SignupActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}
